############ BASE CODE FOR LOADING A POSTGRESQL DATABASE INTO PYTHON TO PERFORM SQL QUERIES ############################

# import psycopg2
# from dotenv import load_dotenv
# import os

# load_dotenv() # Loads the environment variables from the .env file

# hostname = os.getenv("HOSTNAME")
# database = os.getenv("DATABASE")
# username = os.getenv("USERNAME")
# pwd = os.getenv("PASSWORD")
# port_id = os.getenv("PORT")



# try:
# # To connect to the database, we just need to use the connect() function. 
#     conn = psycopg2.connect(
#         host = hostname,
#         dbname = database,
#         user = username,
#         password = pwd,
#         port = port_id
#     )


############ Write all SQL queries here ############################

# 1) Open a cursor in order to perform SQL operations. Said cursor will also store the results of the operations. 



#     conn.close()  # Close the connection when done
# except Exception as error:
#     print("Error:", error)



import psycopg2
from dotenv import load_dotenv
import os
import psycopg2.extras

load_dotenv() # Loads the environment variables from the .env file

hostname = os.getenv("HOSTNAME")
database = os.getenv("DATABASE")
username = os.getenv("USERNAME")
pwd = os.getenv("PASSWORD")
port_id = os.getenv("PORT")

cursor = None  # Initialize cursor to None
conn = None  # Initialize connection to None


try:
    # To connect to the database, we just need to use the connect() function. 
    with psycopg2.connect(
        host = hostname,
        dbname = database,
        user = username,
        password = pwd,
        port = port_id
    ) as conn:

        cursor = conn.cursor() # Opens a cursor.

        cursor.execute("DROP TABLE IF EXISTS employee") # This line is used to drop the table if it already exists.

        # method for creating a table in the database.
        create_script = """ CREATE TABLE IF NOT EXISTS employee (
            id  int PRIMARY KEY,
            name    varchar(40) NOT NULL,
            salary  int,
            dept_id varchar(30))"""

        #Executes the SQL script to create the employee table if it doesn't already exist. 
        cursor.execute(create_script)


        # Inserting some data into the employee table. 
        insert_script = """ INSERT INTO employee (id, name, salary, dept_id)
        VALUES (%s, %s, %s, %s)""" # In order to prevent SQL injection, we use the %s placeholder for the values to be inserted.

        insert_values = [(1, "James", 12000, "D1"), (2, "George", 15000, "D1"), (3, "Dave", 20000, "D2")]  # You can also insert multiple rows, by using a list of tuples.
        #If I were to run the above line, I would get an error because the value has already been inserted and the primary key is unique.
        # So we can either drop the table and recreate it, or we can use the ON CONFLICT clause to handle the conflict.
        # The ON CONFLICT clause should be used in the INSERT statement to handle conflicts with existing rows.
        # We can then say DO NOTHING to ignore the conflict (i.e. do not insert the row for example) or DO UPDATE to update the existing row with the new values.


        # cursor.execute(insert_script, insert_values)


        # Since we have multiple records to insert, we can use a for loop.
        for record in insert_values:
            cursor.execute(insert_script, record)

        # This won't create the table just yet because we need to commit the changes to the database.
        conn.commit()  # Commit the transactions we've done to the database





        ############################## FETCHING DATA FROM THE DATABASE #####################################
        cursor.execute("SELECT * FROM employee")
        for record in cursor.fetchall():
            print(record)
        
        # This will return a tuple and I can access the values by indexing the tuple if I have to.
        #print(cursor.fetchall()) Fetches all the records from the employee table and prints them.

        # This is inefficient if the table is large so we can instead create a dictionary instead of a tuple.
        with conn.cursor(cursor_factory = psycopg2.extras.DictCursor) as cursor:# This will create a cursor that returns rows as dictionaries.
            for record in cursor.fetchall():
                print(record['name'], record['salary'])

        
        # Method for updating data in the database is the exact same as the regular method for fetching data. 


        # Method for deleting data
        delete_script = "DELETE FROM employee where name = %s"
        delete_record = ("James",)  # Note the comma to make it a tuple
        cursor.execute(delete_script, delete_record)

        # We are now going to use Context Managers to perform the same operations as above. 
        # We use the 'with' clause when we are setting up the connection and cursor.




except Exception as error:
    print("Error:", error)

finally:

    if cursor is not None: #If the cursor is open
    # Regardless of 
        cursor.close() # Close the cursor when done


    if conn is not None: # If the connection is open after operations.
    # Close the connection when done
        conn.close()  # This line would never run if the database connection fails so the conn object would not be created in the first place. 
    # To solve this, we define the conn and cursor objects as None 