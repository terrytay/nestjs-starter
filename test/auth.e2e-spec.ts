import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) signs up a new user', async () => {
    const newEmail = 'test123456@gmail.com';

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: newEmail, password: '123' })
      .expect(201);

    const { id, email } = response.body;
    expect(id).toBeDefined();
    expect(email).toEqual(newEmail);
  });

  it('signup a new user and get the currently logged in user', async () => {
    const newEmail = 'test123@gmai.com';

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: newEmail, password: '123' })
      .expect(201);

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(newEmail);
  });
});
