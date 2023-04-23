import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { SlaveWorkflowDependencyEntityConfig } from '../../../../entities/workflows/slave/slaveWorkflowDependencyEntityConfig.js';

const slaveWorkflowContainer = new Container();
const config = new SlaveWorkflowDependencyEntityConfig();

slaveWorkflowContainer
  .bind<Workflow<[string, boolean, boolean]>>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getSlaveWorkflow());

export { slaveWorkflowContainer };
