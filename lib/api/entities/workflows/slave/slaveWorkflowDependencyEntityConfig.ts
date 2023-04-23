import { CommandSlaveWorkflow } from '../../../../core/workflows/slave/command/commandSlaveWorkflow.js';
import { PromptServiceImpl } from '../../../../serviceAgent/services/promptServiceImpl.js';
import { SlaveServiceImpl } from '../../../../serviceAgent/services/slaveServiceImpl.js';
import { FilepathVariables } from '../../../variables/filepathVariables.js';

export class SlaveWorkflowDependencyEntityConfig {
  getPromptService() {
    return new PromptServiceImpl();
  }

  getSlaveService() {
    return new SlaveServiceImpl(FilepathVariables.currentDir);
  }

  getSlaveWorkflow() {
    return new CommandSlaveWorkflow(this.getPromptService(), this.getSlaveService());
  }
}
