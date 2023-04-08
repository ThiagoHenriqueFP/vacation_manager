import os
import requests
import smtplib

from connection import postgresql_to_dataframe
from connection import conn

from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from fastapi.middleware.cors import CORSMiddleware

origins = ['http://127.0.0.1:5173', '*']

host = 'smtp.gmail.com'
port = 587


class Solicitation(BaseModel):
    name: str
    start: str
    end: str
    # receiver: str


class Report(BaseModel):
    team_id: int
    type: int
    start: str
    end: str
    employee_id: int
    receiver: str


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

token = os.getenv("TOKEN")

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}


@app.get("/")
async def root():
    return {"Message": os.getenv('TOKEN')}


@app.post("/send/workplace")
async def sendWorplace(solicitation: Solicitation):
    try:
        url = 'https://graph.facebook.com/v4.0/me/messages'

        data = {
            "messaging_type": "UPDATE",
            "recipient": {
                "id": 100090258879499
            },
            "message": {
                "text": f"O funcionário {solicitation.name} solicitou férias, iniciando na data {solicitation.start} até o dia {solicitation.end}"
            }
        }

        requests.post(url, headers=headers, json=data)

        return {"status": 200, "message": "Notificação enviada para o workplace"}
    except (Exception) as error:
        return {'status': 400, 'message': error}


@app.post('/send/mail')
async def sendNotificationForEmail(solicitation: Solicitation):
    try:
        body = f"O funcionário {solicitation.name} solicitou férias, iniciando na data {solicitation.start} até o dia {solicitation.end}"

        msg = MIMEText(body, 'html')

        sender = 'thiagop070@gmail.com'
        password = os.getenv('PASSWORD')

        msg['Subject'] = "Solicitação de férias"
        msg['From'] = sender
        msg['To'] = solicitation.receiver

        s = smtplib.SMTP(host, port)
        s.ehlo()
        s.starttls()
        s.login(sender, password)
        s.sendmail(sender, solicitation.receiver, msg.as_string())
        s.quit()

        return {'status': 200, 'message': 'email enviado para o gestor'}
    except (Exception) as error:
        return {'status': 500, 'message': error}


@app.post('/send/report')
async def sendReport(report: Report):
    try:
        column_names = ["id", "team_id", "employee_id", "date_start",
                        "date_end", "status", "reason", "thirteenth", "name", "registration"]
        df = None
        if report.type == 0:
            # team vacation hisory whith date select
            df = postgresql_to_dataframe(
                conn, f'select e."name", e.registration , v.* from "Employee" e inner join "Vacation" v ON e.id = v.employee_id where team_id={report.team_id} and (date_start>={report.start} and date_end<={report.end})', column_names)
        elif report.type == 1:
            # team vacation history
            df = postgresql_to_dataframe(
                conn, f'select e."name", e.registration , v.* from "Employee" e inner join "Vacation" v ON e.id = v.employee_id where team_id={report.team_id}', column_names)
        elif report.type == 2:
            # employee vacation history
            df = postgresql_to_dataframe(
                conn, f'select e."name", e.registration , v.* from "Employee" e inner join "Vacation" v ON e.id = v.employee_id where employee_id={report.employee_id}', column_names)
        else:
            return {"Error": "Error 400 BAD_REQUEST"}

        df.to_csv('report.csv', sep=';', encoding='latin1')

        sender = 'thiagop070@gmail.com'

        multipart = MIMEMultipart()
        multipart['Subject'] = 'Relatório de férias'
        multipart['From'] = sender
        multipart['To'] = report.receiver

        body = f'<h1>Relatório de férias</h1>'

        attachment = MIMEApplication(
            df.to_csv(sep=';', encoding='latin1'))

        attachment["Content-Disposition"] = "attachment; filename={}".format(
            f"report.csv")

        multipart.attach(attachment)
        multipart.attach(MIMEText(body, 'html'))

        sender = 'thiagop070@gmail.com'
        password = os.getenv('PASSWORD')

        print("antes de criar a conexão")
        s = smtplib.SMTP(host, 587)
        print("depois de criar a conexão")
        s.ehlo()
        s.starttls()
        s.login(sender, password)
        s.sendmail(sender, report.receiver, multipart.as_string())
        s.quit()

        return {"data": df.to_csv(sep=';', encoding='latin1')}
    except (Exception) as error:
        return {"Status": 500, "Error": error.__cause__}
