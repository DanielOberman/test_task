# Use the official Python image as the base image
FROM python:3.9

# Set the working directory
WORKDIR /usr/app/src

# Copy your application files into the container
COPY main.py ./
COPY requirements.txt ./

# Install the required packages from requirements.txt
RUN pip install -r requirements.txt

# Command to run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
