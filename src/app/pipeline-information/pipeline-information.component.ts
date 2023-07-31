import { Component } from '@angular/core';
import { JenkinsService } from '../../services/jenkins.service';

@Component({
  selector: 'app-pipeline-information',
  templateUrl: './pipeline-information.component.html',
  styleUrls: ['./pipeline-information.component.scss'],
})
export class PipelineInformationComponent {
  buildDetails: any;

  constructor(private jenkinsService: JenkinsService) {}

  async fetchBuildDetails() {
    const jobName = 'Test'; // Replace with the desired Jenkins job name
    const buildNumber = 9; // Replace with the build number you want to fetch

    this.jenkinsService.getBuildDetails(jobName, buildNumber)
      .then((response) => {
        this.buildDetails = response.data;
      })
      .catch((error) => {
        console.error('Error fetching build details:', error);
      });
  }
}
