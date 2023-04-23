import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowDependencyEntityConfig } from '../../../../entities/workflows/project/projectWorkflowDependencyEntityConfig.js';

const cloneProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowDependencyEntityConfig();

cloneProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCloneProjectWorkflow());

export { cloneProjectWorkflowContainer };
