import dagre from 'dagre';
import { useEffect, useState } from 'react';
import ReactFlow, {
  ConnectionLineType,
} from 'reactflow';

import { Button } from './ui/Button';

interface SchemaProps {
  data: any;
  onOk: () => void;
}

export default function Schema({ data, onOk }: SchemaProps) {
  const [initNodes, setInitNodes] = useState([]);
  const [initEdges, setInitEdges] = useState([]);
  const position = { x: 0, y: 0 };
  const edgeType = 'smoothstep';
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'user' },
      position,
    }
  ];
  const initialEdges = [];


  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initNodes,
    initEdges
  );

  const createSchema = () => {
    const newNodes = initialNodes;
    const newEdges = initialEdges;

    data.forEach((record, recordIndex) => {
      // push input node
      record.criteria.forEach((criteriaRecord, criteriaIndex) => {
        newNodes.push({
          type: '',
          id: `input-${recordIndex + 1}-${criteriaIndex + 1}`,
          data: { label: criteriaRecord },
          position,
        });

        newEdges.push({
          id: `e-${recordIndex + 1}-${criteriaIndex + 1}`,
          target: `input-${recordIndex + 1}-${criteriaIndex + 1}`,
          source: '1',
          type: edgeType,
          animated: true
        });

        newEdges.push({
          id: `oe-${recordIndex + 1}-${criteriaIndex + 1}`,
          source: `input-${recordIndex + 1}-${criteriaIndex + 1}`,
          target: `output-${recordIndex + 1}`,
          type: edgeType,
          animated: true
        });
      });

      // push output node
      newNodes.push({
        type: 'output',
        id: `output-${recordIndex + 1}`,
        data: { label: record.message },
        position,
      });
    });
    setInitNodes(newNodes);
    setInitEdges(newEdges);
  }

  useEffect(() => {
    createSchema();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-2lg h-2lg" style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={layoutedNodes}
          edges={layoutedEdges}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView  />

      </div>
      <div className="flex justify-center mt-5">
        <Button onClick={() => onOk()}>Ok</Button>
      </div>
    </div>
  )
}
