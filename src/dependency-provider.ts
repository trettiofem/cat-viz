import {
    Event,
    EventEmitter,
    ProviderResult,
    ThemeIcon,
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState
} from "vscode";
import { Dependency } from "./types";

export class DependencyProvider implements TreeDataProvider<DependencyItem> {
    private files: DependencyItem[] = [];

    getTreeItem(element: DependencyItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(
        element?: DependencyItem | undefined
    ): ProviderResult<DependencyItem[]> {
        if (!element) {
            return Promise.resolve(this.files);
        }
    }

    private _ononDidChangeTreeData: EventEmitter<
        DependencyItem | undefined | null | void
    > = new EventEmitter<DependencyItem | undefined | null | void>();
    readonly onDidChangeTreeData?:
        | Event<void | DependencyItem | DependencyItem[] | null | undefined>
        | undefined = this._ononDidChangeTreeData.event;

    refresh(list: Dependency[]): void {
        this.files = list.map((d) => {
            if (d.classpath) {
                return new ClasspathItem(d.path);
            } else {
                return new FileItem(d.path);
            }
        });

        this._ononDidChangeTreeData.fire();
    }
}

class DependencyItem extends TreeItem {
    constructor(
        public readonly path: string,
        public readonly classpath: boolean
    ) {
        super(path, TreeItemCollapsibleState.None);

        this.tooltip = path + (classpath ? " (classpath)" : "");
        this.description = classpath ? "(classpath)" : "";
    }
}

class FileItem extends DependencyItem {
    constructor(path: string) {
        super(path, false);
    }

    iconPath = new ThemeIcon("file-code");
}

class ClasspathItem extends DependencyItem {
    constructor(path: string) {
        super(path, true);
    }

    iconPath = new ThemeIcon("file-binary");
}
