import { EventNode } from '@/components/molecules/EventNode'
import { EditorSidePanel } from '@/components/organisms/EditorSidePanel'
import { useGetWindowSize } from '@/hooks/useGetWindowSize'
import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Edge,
  FitViewOptions,
  Node,
} from 'reactflow'

export type NodeDataType = {
  label: string
  name: string
  color: string
}

const initialNodes: Node<NodeDataType>[] = [
  {
    id: '1',
    data: {
      label: 'Node 1',
      name: 'Sample Event Node 1',
      color: '#38B5AD',
    },
    position: { x: 5, y: 5 },
    type: 'eventNode',
  },
  {
    id: '2',
    data: { label: 'Node 2', name: 'test2', color: '#FF5660' },
    position: { x: 5, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3', name: 'test3', color: '#FF5660' },
    position: { x: 400, y: 200 },
  },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const nodeTypes = { eventNode: EventNode }

export const Editor = () => {
  const { height: windowHeight, width: windowWidth } = useGetWindowSize()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: Edge[]) =>
        addEdge(
          {
            ...params,
          },
          eds,
        ),
      ),
    [setEdges],
  )

  return (
    <div style={{ height: windowHeight, width: windowWidth }}>
      {windowWidth > 0 && windowHeight > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitViewOptions={fitViewOptions}
        >
          <Controls />
          <Background style={{ backgroundColor: '#f5f5f5' }} />
        </ReactFlow>
      ) : undefined}
      {selectedNode && (
        <EditorSidePanel
          node={selectedNode}
          settings={{ sampleProperty: 'aaa' }}
        />
      )}
    </div>
  )
}
