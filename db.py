from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") #Gets the MongoDB connection string from the environment variable

client = MongoClient(MONGO_URI) # Connects to the MongoDB server using the connection string
# If you want to specify a database, you can do so like this:
# db = client['your_database_name']  # Replace 'your_database_name' with your actual database name


db = client.get_database()  # Gets the default database from connection string

users_collection = db.users # Collection for user data