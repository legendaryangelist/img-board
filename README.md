# Shatter

Crypto wallet and NFT based Imageboard, 
built on Django REST API using React, Web3, Docker, Nginx and PostgreSQL. 

```WIP - Unfinished as of this commit!```

## Development instructions (Docker)
**Required - Docker 20.10.2**

Run Docker, then:
```bash
git clone https://github.com/genuine-developer/Shatter.git
cd Shatter/
docker-compose up
```


## Development instructions (No-Docker)
**Required - Python 3.7.9, conda 4.8.4, Node.js 15.5.1**

1. First time:
- Use this env for all terminals/workdirs

```bash
git clone https://github.com/genuine-developer/Shatter.git
cd Shatter
conda create -n shatter
conda activate shatter
pip install -r backend/requirements.txt
```

2. Configuring PostgreSQL + CORS:
- Run pgAdmin4, make sure to add .env file
- Add a file called 'local_settings.py' inside backend/django_app/mainapp/:
  
```python
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# PostgreSQL
DATABASES = {
    "default": {
        "ENGINE": os.environ.get("DB_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("DB_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("DB_USER", "user"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "password"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}

# (CORS) Cross-Origin Resource Sharing Settings
CORS_ORIGIN_ALLOW_ALL = True

```

3. Start development backend server:
- Backend server will run on http://127.0.0.1:8000/
```bash
cd backend/django_app/
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

4. Start development frontend server:
- Frontend server will run on http://127.0.0.1:3000/
```bash
cd frontend/react_app/
npm install
npm start
```
