
<p align="center" id="project">
<h3 align="center">Prologic API</h3>

<p align="center">
  Web Api created for building applications in voluntary work in NGOs and in teaching new professionals of Technology

<p align="center">
    <a href="https://github.com/ricardopadua">
      <img src="https://img.shields.io/badge/powered-birdcode-blue.svg?style=flat-square" alt="Nest Powered" />
    </a>
</p>

</p>


<!-- GETTING STARTED -->
## Getting Started
Follow these steps and quickly your application will be running, remember the purpose of this project, be a volunteer and help some institution with your knowledge..

### Prerequisites
* Npm
  ```sh
  npm install -g typescript
  ```
* PostgreSQL Database
  ```sh
  docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ricardopadua/prologic-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure the environment variables in the config folder `/config` , there are 3 configuration files, the `default.json` that represents the development environment, the `production.json` that represents the production environment and the `index.ts` that imports these configured environments and exports these constants to the application. Observe the example respectively:
##### default.json
```json
{
    "ioc": {
        "childContainerBind": "" 
    },
    "cryptography": {
        "passwordDefault": ""
    }
}
```
##### production.json
```json
{
    "ioc": {
        "childContainerBind": ""
    },
    "cryptography": {
        "passwordDefault": ""
    }
}
```
##### index.ts
```ts
import config from 'config';
//  IOC configuration constant
const ioc = {
    childContainerBind: config.get<string>('ioc.childContainerBind')
};
//  Cryptography configuration constant
const cryptography = {
    passwordDefault: config.get<string>('cryptography.passwordDefault')
};
const environment = {
    ioc: ioc,
    cryptography: cryptography,
}
export default environment;
```

<!-- DOCKER -->
### docker (Optional)
1. If you want to run the application in docker, configure the file docker-compose and after the command `docker-compose up --build -d`
2. Configure the environment variables for containers in `docker-compose.yml`  file:
##### docker-compose.yml
```yml
version: '3.4'
services:
  server:
    build:
      context: .
      dockerfile: ./Dockerfile
      args:
        - http_proxy
        - https_proxy
        - no_proxy
    image: prologyc/server:latest
    ports:
      - '8433:8433'
    stdin_open: true
    tty: true
  postgres-db:
    image: 'postgres:9.6.2'
    container_name: postgres
    environment:
      POSTGRES_HOST: 
      POSTGRES_PASSWORD: 
      POSTGRES_DB: 
      POSTGRES_USER: 
      PGDATA: /tmp
    ports:
      - '5432:5432'
    hostname: postgres-log
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - './docker-volumes/postgres-desenvolvimento:/var/lib/postgresql/data'
```


<!-- GIST SAMPLE CONFIGURATION -->
## Sample configuration

See the [sample gist configuration](https://gist.github.com/ricardopadua/8c1a8f7e1c2648986b9d7177718f82ca) for a sample of configuration (environment variables).


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ricardopadua/prologic-webapi/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Ricardo Padua - [@RicardoPdua4](https://twitter.com/RicardoPdua4)

Project Link: [https://github.com/ricardopadua/prologic-webapi](https://github.com/ricardopadua/prologic-webapi)
