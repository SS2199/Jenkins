import { Component } from '@angular/core';
import { JenkinsService } from '../../services/jenkins.service';

@Component({
  selector: 'app-create-job',
  template: `
    <h1>Create New Jenkins Job</h1>
    <button (click)="createJob()">Create Job</button>
  `,
})
export class CreateJobComponent {
  constructor(private jenkinsService: JenkinsService) {}

  createJob() {
    const jobName = 'Jenkinsnew1'; // Replace 'Your_Job_Name' with the desired name for your Jenkins job
    const pipelineScript = `
    pipeline {
      agent any
  
      stages {
          stage('Checkout') {
              steps {
                checkout scmGit(branches: [[name: '*main']], extensions: [], userRemoteConfigs: [[url: 'https://gitlab.com/vm1999/gitlab-first.git']])
              }
          }
          stage('Build'){
              steps {
                  git branch: 'main', url: 'https://gitlab.com/vm1999/gitlab-first.git'
                  bat ' sample.py'
              }
          }
          stage('Test'){
              steps {
                  echo 'the job has been tested'
              }
          }
      }
  }
    `;

    this.jenkinsService.createPipelineJob(jobName, pipelineScript)
      .then((response) => {
        console.log('Job created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating job:', error);
      });
  }
}
