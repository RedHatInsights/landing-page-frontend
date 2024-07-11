import React, { MouseEvent } from 'react';
import {
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarToggleGroup,
} from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import {
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core/dist/dynamic/components/MenuToggle';
import {
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core/dist/dynamic/components/Select';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { severityTypes, statusTypes } from '../../utils/consts';

export const SupportCaseWidgetTableFilter: React.FunctionComponent = () => {
  const [isSeverityExpanded, setIsSeverityExpanded] = React.useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = React.useState(false);

  const [filters, setFilters] = React.useState<Record<string, string[]>>({
    severity: [],
    status: [],
  });

  const onSelect = React.useCallback(
    (
      type: string,
      event?: React.MouseEvent<Element, MouseEvent> | undefined,
      value?: string | undefined
    ) => {
      if (!event || typeof value !== 'string') {
        return;
      }

      const checked = (event.target as HTMLInputElement).checked;
      setFilters((prev) => {
        const prevSelections = prev[type] || [];
        return {
          ...prev,
          [type]: checked
            ? [...prevSelections, value]
            : prevSelections.filter((v) => v !== v),
        };
      });
    },
    []
  );

  const onSeveritySelect = (
    event: React.MouseEvent<Element, MouseEvent>,
    value: string
  ) => {
    onSelect('severity', event, value);
  };

  const onStatusSelect = (
    event: React.MouseEvent<Element, MouseEvent>,
    value: string
  ) => {
    onSelect('status', event, value);
  };

  const onDelete = (type: string, id: string) => {
    const filterTypes: { [key: string]: string[] } = {
      severity: filters.severity.filter((fil: string) => fil !== id),
      status: filters.status.filter((fil: string) => fil !== id),
    };
    setFilters({
      severity: type === 'Severity' ? filterTypes[type] : filters.severity,
      status: type === 'Status' ? filterTypes[type] : filters.status,
    });
  };

  const onDeleteGroup = (type: string) => {
    const newFilters = {
      severity: type === 'Severity' ? [] : filters.severity,
      status: type === 'Status' ? [] : filters.status,
    };
    setFilters(newFilters);
  };

  const onSeverityToggle = () => {
    setIsSeverityExpanded(!isSeverityExpanded);
  };

  const onStatusToggle = () => {
    setIsStatusExpanded(!isStatusExpanded);
  };

  const statusVariants = [
    statusTypes.closed,
    statusTypes.customerWaiting,
    statusTypes.redHatWaiting,
  ];

  const severityVariants = [
    severityTypes.high,
    severityTypes.low,
    severityTypes.normal,
    severityTypes.urgent,
  ];

  const statusMenuItems = (
    <SelectList>
      {statusVariants.map((statusType) => (
        <SelectOption
          hasCheckbox
          key={statusType}
          value={statusType}
          isSelected={filters.status.includes(statusType)}
        >
          {statusType}
        </SelectOption>
      ))}
    </SelectList>
  );

  const severityMenuItems = (
    <SelectList>
      {severityVariants.map((severityType) => (
        <SelectOption
          hasCheckbox
          key={severityType}
          value={severityType}
          isSelected={filters.severity.includes(severityType)}
        >
          {severityType}
        </SelectOption>
      ))}
    </SelectList>
  );

  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          chips={filters.severity}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Severity"
        >
          <Select
            aria-label="Severity"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onSeverityToggle}
                isExpanded={isSeverityExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Severity
              </MenuToggle>
            )}
            onSelect={(event, value) =>
              onSeveritySelect(
                event as unknown as React.MouseEvent<Element, MouseEvent>,
                value as string
              )
            }
            selected={filters.severity}
            isOpen={isSeverityExpanded}
            onOpenChange={(isOpen) => setIsSeverityExpanded(isOpen)}
          >
            {severityMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.status}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Status"
        >
          <Select
            aria-label="Status"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onStatusToggle}
                isExpanded={isStatusExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Status
              </MenuToggle>
            )}
            onSelect={(event, value) =>
              onStatusSelect(
                event as unknown as React.MouseEvent<Element, MouseEvent>,
                value as string
              )
            }
            selected={filters.status}
            isOpen={isStatusExpanded}
            onOpenChange={(isOpen) => setIsStatusExpanded(isOpen)}
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
      </ToolbarGroup>
    </React.Fragment>
  );

  const toolbarItems = (
    <React.Fragment>
      <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
        {toggleGroupItems}
      </ToolbarToggleGroup>
    </React.Fragment>
  );

  return (
    <Toolbar
      id="toolbar-with-filter"
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="xl"
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
