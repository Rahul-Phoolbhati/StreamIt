# StreamIt
A streaming tool for the youtube, linkedin etc. platforms.

StreamIt is a Node.js application that utilizes RTMP, ffmpeg, Docker, and the Node.js cluster module to stream video content on platforms like YouTube, LinkedIn, etc., while also providing scalability through multiple worker processes.

## Features

- **RTMP Streaming**: StreamIt enables real-time multimedia streaming using the Real-Time Messaging Protocol (RTMP).
- **ffmpeg Integration**: Integration with ffmpeg allows for efficient encoding and streaming of video content.
- **Dockerization**: The application is containerized using Docker, ensuring consistency across different environments and facilitating easy deployment.
- **Scalability with Cluster Module**: The Node.js cluster module is employed to scale the application across multiple CPU cores, ensuring optimal resource utilization and improved performance, which by default uses round-robin approach for distributing incoming connections.

## Installation

To run StreamIt locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Rahul-Phoolbhati/StreamIt.git

2. Navigate to the project directory:
    ```bash
     cd StreamIt

3. Create a .env file and write the PORT you want like
     ``` PORT=3000 ```

5. Run with Docker:
    ```bash
      docker compose up

#### ffmpeg terms or config - 
    ```
    -i <input_stream_url>  # Replace with your RTMP input URL
    -c:v libx264           # Specify video codec (adjust as needed)
    -b:v <bitrate>         # Set video bitrate (adjust as needed)
    -c:a aac               # Specify audio codec (adjust as needed)
    -b:a <bitrate>         # Set audio bitrate (adjust as needed)
    <output_stream_url>    # Replace with your platform's RTMP ingest URL


## ToDo: 

* Making easy for users
* Container Management system for more scalability
* Screen Feature






> The ffmpeg setup is done in the container itself not in local machine.
