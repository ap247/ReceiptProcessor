# Receipt Processor
This project takes in receipts and assigns points and an id to each receipt

# Running the Project
Use ```docker compose up``` in the terminal to start the server at https://localhost:3000

Submit receipts in json format at https://localhost:3000/process

Use the id returned to retrieve points of submitted receipt at https://localhost:3000/{id}/points

