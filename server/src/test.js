const request = require('supertest');
const express = require('express');
const app = express();
const launchesRouter = require('./routes/launches/launches.router');
const planetsRouter=require("./routes/planets/planets.router.js")
app.use(express.json())

app.use("/launches",launchesRouter)
app.use("/planet",planetsRouter)

describe("Test Launches Endpoint",()=>{
    it("GET / should return a Array of launches",
    (done)=>{
        request(app)
        .get("/launches")
        .expect("Content-Type",/json/)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err)
            expect(res.body).toBeInstanceOf(Array)
            done()

        })
    })
    it("Post / should return a Array of launches",
    (done)=>{
        const newLaunch = {
            mission: 'Test Mission',
            rocket: 'Test Rocket',
            launchDate: '2023-11-06T12:00:00Z',
            target: 'Test Planet',
          };
          request(app)
          .post('/launches')
          .send(newLaunch)
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
    
            // Add more assertions as needed
            expect(res.body).toHaveProperty('mission', newLaunch.mission);
            done();
          });
          
    })

    it("Post / should return a  error: 'Missing required launch property' ",
    (done)=>{
        const newLaunch = {
            rocket: 'Test Rocket',
            launchDate: '2023-11-06T12:00:00Z',
            target: 'Test Planet',
          };
          request(app)
          .post('/launches')
          .send(newLaunch)
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
    
            // Add more assertions as needed
            expect(res.body).toHaveProperty('error','Missing required launch property');
            done();
          });
          
    })
    it("Post / should return a  error: 'Invalid launch date' ",
    (done)=>{
        const newLaunch = {
            mission: 'Test Mission',
            rocket: 'Test Rocket',
            launchDate: '2023-112-06T12:00:00Z',
            target: 'Test Planet',
          };
          request(app)
          .post('/launches')
          .send(newLaunch)
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
    
            // Add more assertions as needed
            expect(res.body).toHaveProperty('error','Invalid launch date');
            done();
          });
          
    })
    it('DELETE /launches/:id should mark a launch as aborted', (done) => {

        request(app)
          .delete('/launches/100')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
    
            // Validate the response
            expect(res.body).toHaveProperty('upcoming', false);
            expect(res.body).toHaveProperty('success', false);
            done();
          });
      });
      it('DELETE /launches/:id should mark a return 404 when do not found', (done) => {
    
        request(app)
          .delete('/launches/10000')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
    
            done();
          });
      });
    
})

describe("Test Plannet Endpoint",()=>{
    it("GET / should return a Array of launches",
    (done)=>{
        request(app)
        .get("/planet")
        .expect("Content-Type",/json/)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err)
            expect(res.body).toBeInstanceOf(Array)
            done()

        })
    })
    
    
})