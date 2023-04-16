import { inject, injectable } from 'inversify';
import { CloneProjectWorkflow } from '../../../../../core/workflows/project/clone/cloneProjectWorkflow.js';
import { Entity } from '../../../entity.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';

@injectable()
export class CloneProjectWorkflowEntity
  implements Entity<CloneProjectWorkflow>
{
  constructor(
    @inject(WorkflowTypes.Workflow)
    private readonly workflow: CloneProjectWorkflow
  ) {}

  instance(): CloneProjectWorkflow {
    return this.workflow;
  }
}
