import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';

const cloneProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyConfig();

cloneProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCloneProjectWorkflow());

export { cloneProjectWorkflowContainer };
