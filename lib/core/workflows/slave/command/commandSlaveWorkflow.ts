import { PromptServiceImpl } from '../../../../serviceAgent/services/promptServiceImpl.js';
import { SlaveService } from '../../../services/slaveService.js';

import { Workflow } from '../../workflow.js';

export class CommandSlaveWorkflow
  implements Workflow<[string, boolean, boolean]>
{
  private readonly promptService: PromptServiceImpl;
  private readonly slaveService: SlaveService;

  constructor(promptService: PromptServiceImpl, slaveService: SlaveService) {
    this.promptService = promptService;
    this.slaveService = slaveService;
  }

  async start(
    command: string,
    isSpecifying: boolean,
    isOmitting: boolean
  ): Promise<void> {
    if (isOmitting) {
      const folderPaths: string[] = await this.slaveService.getAllSubfolders();

      const excludedFolders = await this.promptService.promptExcludedFolders(
        folderPaths
      );

      await this.slaveService.command(command, {
        excluded: excludedFolders,
      });
    }

    if (isSpecifying) {
      const folderPaths: string[] = await this.slaveService.getAllSubfolders();

      const includedFolders = await this.promptService.promptIncludedFolders(
        folderPaths
      );

      await this.slaveService.command(command, {
        included: includedFolders,
      });
    }

    if (!isOmitting && !isSpecifying) {
      await this.slaveService.command(command);
    }
  }
}
