import { inject, injectable } from 'inversify';
import { CreateProjectWorkflow } from '../../../../../core/workflows/project/create/createProjectWorkflow.js';
import { Entity } from '../../../entity.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { CommandSlaveWorkflow } from '../../../../../core/workflows/slave/command/commandSlaveWorkflow.js';

@injectable()
export class CreateProjectWorkflowEntity
  implements Entity<CommandSlaveWorkflow>
{
  constructor(
    @inject(WorkflowTypes.Workflow)
    private readonly workflow: CommandSlaveWorkflow
  ) {}

  instance(): CommandSlaveWorkflow {
    return this.workflow;
  }
}
