from pydantic import BaseModel


class SmsRequest(BaseModel):
    phone: str
    message: str


class EmailRequest(BaseModel):
    email: str
    subject: str
    body: str
