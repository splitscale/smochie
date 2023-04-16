import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';

const createProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyConfig();

createProjectWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getCreateProjectWorkflow());

export { createProjectWorkflowContainer };
