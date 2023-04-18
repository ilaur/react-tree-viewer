import React from 'react';
import { useEffect, useState } from 'react';
import { Stack, TextField, Box } from '@mui/material';

import { ParameterNode } from '../requests/types';

import { useAppContext } from '../AppContext';

export default function ParametersBranchEditor(): React.ReactElement {
  const { parameters, selectedNodeId } = useAppContext();
  const [currentFields, setCurrentFields] = useState<ParameterNode | null>();

  useEffect(() => {
    const findNodeAndSetFields = (
      treeNode: ParameterNode | null,
      targetNodeId: string,
      currentNodeId: string = '0',
    ): void => {
      if (currentNodeId === targetNodeId) {
        setCurrentFields(treeNode);
        return;
      } else if (Array.isArray(treeNode) && treeNode.length > 0) {
        treeNode.forEach((node, id) => {
          const composedId = currentNodeId + id;

          if (composedId === targetNodeId) {
            setCurrentFields(node);
            return;
          }

          findNodeAndSetFields(node.children, targetNodeId, composedId);
        });
      }
    };

    if (selectedNodeId) {
      findNodeAndSetFields(parameters, selectedNodeId);
    }
  }, [selectedNodeId, parameters]);

  const renderFields = (fieldName: string, fieldValue: any): React.ReactElement => {
    if (fieldValue === undefined) {
      return <div />;
    }

    return (
      <TextField
        id="standard-basic"
        label={fieldName}
        value={fieldValue[fieldName] || null}
        variant="standard"
      />
    );
  };

  const values = currentFields?.json || {};

  return (
    <Box sx={{ maxWidth: '300px' }}>
      <Stack>
        {renderFields('name', currentFields)}

        {Object.keys(values).map((key) => {
          return renderFields(key, values);
        })}
      </Stack>
    </Box>
  );
}
