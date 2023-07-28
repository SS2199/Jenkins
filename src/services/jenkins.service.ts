import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class JenkinsService {
  private apiUrl = 'http://127.0.0.1:3000'; // Replace this with your Node.js server URL

  constructor() {}

  async createPipelineJob(jobName: string, pipelineScript: string): Promise<any> {
    const url = `${this.apiUrl}/createJob`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      jobName,
      pipelineScript,
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  getBuildDetails(jobName: string, buildNumber: number): Promise<AxiosResponse<any>> {
    const url = `${this.apiUrl}/job/${encodeURIComponent(jobName)}/${buildNumber}/api/json`;
    return axios.get(url);
  }

  getJobDetails(jobName: string): Promise<AxiosResponse<any>> {
    const url = `${this.apiUrl}/job/${encodeURIComponent(jobName)}/api/json`;
    return axios.get(url);
  }

  getAllJobs(): Promise<AxiosResponse<any>> {
    const url = `${this.apiUrl}/api/json`;
    return axios.get(url);
  }
}
