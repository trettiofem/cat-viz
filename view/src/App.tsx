import { CallGraph } from '@/components/graph';
import { Button } from '@/components/ui/button';
import {
  Menu,
  ChartNetwork,
  Search,
  Table,
  RotateCw,
  FileDown,
  FileJson,
  FileImage
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem
} from './components/ui/dropdown-menu';
import { useState } from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps["checked"];
//type Layout = "euler" | "concentric" | "cola" | "cose" | "breadth-first" | "circle" | "grid";

function App() {
  const [visibility, setVisibility] = useState("none");
  const [layout, setLayout] = useState<string>("euler");
  const [showSCC, setShowSCC] = useState<Checked>(true);

  return (
    <div className="relative">
      <CallGraph className="w-dvw h-dvh" />
      <div className="absolute top-0 left-0 m-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon"><Menu /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">     
          <DropdownMenuItem>
            <Search />
            <span>Search</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />

          <DropdownMenuLabel>Settings</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup value={visibility} onValueChange={setVisibility}>
            <DropdownMenuRadioItem value="none">Hide Attributes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="non-cachable">Show Non-Cachable Attributes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="heat-map">Show Heatmap</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem checked={showSCC} onCheckedChange={setShowSCC}>Show Reachability</DropdownMenuCheckboxItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ChartNetwork />
              <span>Layout</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={layout} onValueChange={setLayout}>
                  <DropdownMenuRadioItem value="euler">Euler Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="concentric">Concentric Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="cola">Cola Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="cose">Cose Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="breadth-first">Breadth-first Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="circle">Circle Layout</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="grid">Grid Layout</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Other</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <RotateCw />
            <span>Refresh</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Table />
            <span>Show Statistics</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileDown />
              <span>Export</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <FileImage />
                  <span>Image</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <FileJson />
                  <span>JSON</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  )
}

export default App;