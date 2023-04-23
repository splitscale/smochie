import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowDependencyEntityConfig } from '../../../../entities/workflows/project/projectWorkflowDependencyEntityConfig.js';

const createProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowDependencyEntityConfig();

createProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCreateProjectWorkflow());

export { createProjectWorkflowContainer };
