import {
    IHttp,
    ILogger,
    IModify,
    IRead,
    IUserBuilder,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { WorkshopApp } from "../WorkshopApp";

export class PhoneCommand implements ISlashCommand {
    public command = "phone";
    public i18nParamsExample = "";
    public i18nDescription = "";
    public providesPreview = false;

    constructor(private readonly app: WorkshopApp) {
        this.app = app;
    }
    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const [subcommand] = context.getArguments();
        const room = context.getRoom();
        const sender = context.getSender();

        if (!subcommand) {
            throw new Error("Error!");
        }
        const message = modify
            .getCreator()
            .startMessage()
            .setSender(sender)
            .setRoom(room);

        switch (subcommand) {
            case "text":
                console.log("Texting with help of console!");
                this.app.getLogger().log("Texting with help of logging!");
                this.app.getLogger().debug("Texting with help of debugging!");
                this.app.getLogger().error("Texting with help of erroring!");
                message.setText(
                    "Texting Message with help of modify accessor!"
                );

                await modify.getCreator().finish(message);
                break;
            case "call":
                console.log("Calling with help of console!");
                this.app.getLogger().log("Calling with help of logging!");
                this.app.getLogger().debug("Calling with help of debugging!");
                this.app.getLogger().error("Calling with help of erroring!");
                message.setText(
                    "Calling Message with help of modify accessor!"
                );

                await modify.getCreator().finish(message);

                break;
            default:
                throw new Error("Error!");
        }
    }
}
