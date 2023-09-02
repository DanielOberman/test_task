# Server
    ## Запуск приложения
        docker-compose build
        docker-compose up
        В папке server запустить команду
            uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Client
    Приложение написано с помощью библиотеки React + TypeScript, для запросов используется Redux Query
    Также в функционале присутствует debugMode, где можно увидеть запрос сформированный на бек энде,
    для удобного дебага запроса.

    ## Запуск приложения
        npm i
        npm run start


