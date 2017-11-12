from flask_script import Manager, Command
from flask_migrate import Migrate, MigrateCommand
import redis
import config

from server import app, db
from rq import Worker, Queue, Connection


# command to run the redis worker
class RunWorker(Command):
    def run(self):
        redis_url = config.REDIS_URL
        listen = ['default']
        redis_connection = redis.from_url(redis_url)
        with Connection(redis_connection):
            worker = Worker(list(map(Queue, listen)))
            worker.work()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)
manager.add_command('runworker', RunWorker())

if __name__ == '__main__':
    manager.run()