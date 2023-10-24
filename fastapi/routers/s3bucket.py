import boto3
import json
from fastapi import APIRouter, Request
from database import Base, engine
from sqlalchemy import Column, Integer, String, Boolean
import mysql.connector
from pydantic import BaseModel

# Get API keys
content = open('config.json')
config = json.load(content)
access_key = config['access_key']
secret_access_key = config['secret_access_key']

# Save to S3
router = APIRouter(
    tags=["meta"],
)

class SqlModel(BaseModel):
  create_table: str
  insert_query: str
  insert_data: list
  json_data: list

# class Employees(Base):
#   __tablename__ = 'employees'

#   id = Column(Integer, primary_key=True, index=True)
#   description = Column(String)
#   compile = Column(Boolean, default=False)

# Employees.Base.metadata.create_all(bind=engine)

@router.post("/s3bucket/")
def saveTos3(sqlQuery: SqlModel) -> list:
  # print(sqlQuery)
  # s3_client = boto3.client('s3', aws_access_key_id='AKIAUD2X5T7L3QVBNWES', aws_secret_access_key='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', region_name='us-east-1')

  # response = s3_client.put_object(
  #     Body=file,
  #     Bucket='custom-tables',
  #     Key='test#2.json'
  # )
  # if response['ResponseMetadata']['HTTPStatusCode'] == 200:
  #     print("File uploaded successfully.")
  # else:
  #     print("File upload failed.")#establishing the connection
  # json_to_values = []
  # for row in sqlQuery.insert_data:
  #   json_to_values.append('(' + row + ')')
  #   json_to_values.append(row)
  conn = mysql.connector.connect(
    user='dba', password='Password123', host='host.docker.internal', port=3306, database='custom_tables_database'
  )

  # #Creating a cursor object using the cursor() method
  cursor = conn.cursor()

  # #Dropping EMPLOYEE table if already exists.
  cursor.execute("DROP TABLE IF EXISTS TEST")

  #Creating table as per requirement
  sql = sqlQuery.insert_query

  data = sqlQuery.insert_data
  cursor.execute(sqlQuery.create_table)


  for row in sqlQuery.insert_data:
    cursor.executemany(sql, [','.join(row)])

  #Closing the connection
  conn.commit()
  conn.close()

  return sqlQuery.json_data
# @router.get("/gettable")

