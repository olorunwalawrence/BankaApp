import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('API ENDPOINTS', () => {
  describe('POST', () => {
     it('should create a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 1,
          firstname: 'john',
          lastname: 'doe',
          email: 'johndoes@gmail.com',
          type: 'saving',
          password: 'johndoe',
          isAdmin: 'yes'

        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.a.property('data');
          
        });
      done();
    });
  });

  it('should not create a user without firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'doe',
        email: 'johndoes@gmail.com',
        type: 'saving',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('firstname field cannot be empty');
      });
    done();
  });

  it('should not create a user without firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '34343',
        lastname: 'doe',
        email: 'johndoes@gmail.com',
        type: 'saving',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('firstname can only be letters');
      });
    done();
  });

 
  it('should not create a user without lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'john',
        lastname: '',
        email: 'johndoes@gmail.com',
        type: 'saving',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('lastname cannot be empty');
      });
    done();
  });

  it('should not create a user with lastname along with numbers', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'john',
        lastname: 'doe3344',
        email: 'johndoes@gmail.com',
        type: 'saving',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('lastname can only be letters');
      });
    done();
  });
  it('should not create a user without email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: '',
        type: 'saving',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('email cannot be empty');
      });
    done();
  });
  it('should not create a user without type', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: 'johndoe@gmail.com',
        type: '',
        password: 'johndoe',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('type cannot be empty');
      });
    done();
  });
  it('should not create a user without password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: 'johndoe@gmail.com',
        type: 'saving',
        password: '',
        isAdmin: 'yes'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('password cannot be empty');
      });
    done();
  });

  it('should not create a user without isAdmin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: 'johndoe@gmail.com',
        type: 'saving',
        password: 'johndoe',
        isAdmin: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('isAdmin cannot be empty');
      });
    done();
  });

  describe('POST', () => {
    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({   
           id:1, 
          email: 'johndoes@gmail.com',       
          password: 'johndoe'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });
  it('should not login a user without password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        id: 1,
        email: 'johndoe@gmail.com',
        password: '',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('password field cannot be empty');
      });
    done();
  });
  it('should not login a user without email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        id: 1,
        email: '',
        password: 'johndoe',

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('email cannot be empty');
      });
    done();
  });
});
