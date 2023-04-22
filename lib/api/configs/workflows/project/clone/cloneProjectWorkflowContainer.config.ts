import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyEntityConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';

const cloneProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyEntityConfig();

cloneProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCloneProjectWorkflow());

export { cloneProjectWorkflowContainer };
