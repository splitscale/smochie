import { inject, injectable } from 'inversify';
import { CreateProjectWorkflow } from '../../../../../core/workflows/project/create/createProjectWorkflow.js';
import { Entity } from '../../../entity.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';

@injectable()
export class CreateProjectWorkflowEntity
  implements Entity<CreateProjectWorkflow>
{
  constructor(
    @inject(WorkflowTypes.Workflow)
    private readonly workflow: CreateProjectWorkflow
  ) {}

  instance(): CreateProjectWorkflow {
    return this.workflow;
  }
}
