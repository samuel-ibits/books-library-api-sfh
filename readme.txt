Running the Applications
Start RabbitMQ using Docker:

#bash
docker build -t rabbitmq-image .
docker run -d --name rabbitmq-container -p 5672:5672 -p 15672:15672 rabbitmq-image
Start both the Client API and Admin API:

#bash
# For Client API
docker build -t client-api-image .
docker run -d --name client-api-container -p 3000:3000 client-api-image

# For Admin API
docker build -t admin-api-image .
docker run -d --name admin-api-container -p 4000:4000 admin-api-image
