import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { faTrash, faPenToSquare, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import { Agent } from 'src/app/interfaces/Agent.interface';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AgentService } from 'src/app/services/Agent.service';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faRotateLeft = faRotateLeft;

  editAgent!: Agent;
  deleteAgent!: Agent;
  resetAgent!: Agent;
  
  agentResponse!: CustomResponse;
  public dataSubject = new BehaviorSubject<any>(null);

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.agentService.agents$.subscribe(response => {
      this.dataSubject.next(response);

      this.agentResponse = response;
      this.agentResponse = { ...response, data: { agents: response.data.agents?.reverse() } };
    })
  }

  addAgent(addForm: NgForm) {

    this.agentService.saveAgent$(addForm.value).subscribe(response => {
      this.dataSubject.next(
        { ...response, data: { agents: [response.data.agent, ...this.dataSubject.value.data.agents] } }
      )
      this.agentResponse = this.dataSubject.value;
    });
    addForm.reset();
  }


  delete(agent: Agent): void {
    console.log(agent.username)
    this.agentService.deleteAgent$(agent.id as number).subscribe(response => {
      this.dataSubject.next(
        {
          ...response, data:
            { agents: this.dataSubject.value.data.agents.filter((ag: { id: number | undefined; }) => ag.id !== agent.id) }
        }
      )
      this.agentResponse = this.dataSubject.value;
    })
  }
  updateAgent(agent: Agent) {
    this.agentService.updateAgent$(agent.id as number, agent).subscribe(
      response => {
        if (response.data && response.data.agent) {
          const updatedAgent = response.data.agent;
          const updatedAgents = this.dataSubject.value.data.agents.map((c: Agent) => {
            if (c.id === updatedAgent?.id) {
              return { ...c, ...updatedAgent };
            }
            return c;
          });
  
          this.dataSubject.next({
            ...response,
            data: {
              ...this.dataSubject.value.data,
              agents: updatedAgents
            }
          });
  
          this.agentResponse = this.dataSubject.value;
        } else {
          console.error('Invalid response or missing agent data.');
        }
      },
      error => {
        console.error('Failed to update agent:', error);
      }
    );
  }

  reset(agent: Agent) {
    this.agentService.resetPassword$(agent.id as number).subscribe();
  }

  onOpenModal(agent: any, mode: string) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
      console.log("add")
    }
    if (mode === 'edit') {
      this.editAgent = agent;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'reset') {
      this.resetAgent = agent;
      button.setAttribute('data-bs-target', '#resetModal');
    }
    if (mode === 'delete') {
      this.deleteAgent = agent;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
