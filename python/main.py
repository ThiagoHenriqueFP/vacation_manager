import os
import requests
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel

class Solicitation(BaseModel):
  name: str
  start: str
  end: str


load_dotenv()

app = FastAPI()

token = os.getenv("TOKEN")

headers = {
  'Authorization': f'Bearer {token}',
  'Content-Type': 'application/json'
}

@app.get("/")
async def root():
  return {"Message" : os.getenv('TOKEN')}

@app.post("/send/workplace")
async def sendWorplace(solicitation: Solicitation):
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

  response = requests.post(url, headers=headers, json=data)

  return response

@app.post('/send/mail')
async def sendNotificationForEmail(solicitation: Solicitation):
  body = f"O funcionário {solicitation.name} solicitou férias, iniciando na data {solicitation.start} até o dia {solicitation.end}"

  host = 'smtp.gmail.com'
  port = 587

  sender = 'thiagop070@gmail.com'
  password = os.getenv('PASSWORD')

  msg = MIMEText(body, 'html')

  msg['Subject'] = "Solicitação de férias"
  msg['From'] = sender
  msg['To'] = 'thiagohp070@gmail.com'

  s = smtplib.SMTP(host, port)
  s.ehlo()
  s.starttls()
  s.login(sender, password)
  s.sendmail(sender, 'thiagohp070@gmail.com', msg.as_string())
  s.quit()

  return True
