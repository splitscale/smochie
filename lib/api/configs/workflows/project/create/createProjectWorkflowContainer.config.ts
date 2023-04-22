import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyEntityConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';

const createProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyEntityConfig();

createProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCreateProjectWorkflow());

export { createProjectWorkflowContainer };
