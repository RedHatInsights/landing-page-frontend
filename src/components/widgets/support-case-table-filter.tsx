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

export interface SupportCaseFilters {
  severity: string[];
  status: string[];
}

interface SupportCaseWidgetTableFilterProps {
  filters: SupportCaseFilters;
  onFiltersChange: (filters: SupportCaseFilters) => void;
}

export const SupportCaseWidgetTableFilter: React.FunctionComponent<
  SupportCaseWidgetTableFilterProps
> = ({ filters, onFiltersChange }) => {
  const [isSeverityExpanded, setIsSeverityExpanded] = React.useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = React.useState(false);

  const onSelect = React.useCallback(
    (
      type: string,
      event?: React.MouseEvent<Element, MouseEvent> | undefined,
      value?: string | undefined,
    ) => {
      if (!event || typeof value !== 'string') {
        return;
      }

      const checked = (event.target as HTMLInputElement).checked;
      const prevSelections = filters[type as keyof SupportCaseFilters] || [];
      onFiltersChange({
        ...filters,
        [type]: checked
          ? [...prevSelections, value]
          : prevSelections.filter((v) => v !== value),
      });
    },
    [filters, onFiltersChange],
  );

  const onSeveritySelect = (
    event: React.MouseEvent<Element, MouseEvent>,
    value: string,
  ) => {
    onSelect('severity', event, value);
  };

  const onStatusSelect = (
    event: React.MouseEvent<Element, MouseEvent>,
    value: string,
  ) => {
    onSelect('status', event, value);
  };

  const onDelete = (type: string, id: string) => {
    const filterTypes: { [key: string]: string[] } = {
      severity: filters.severity.filter((fil: string) => fil !== id),
      status: filters.status.filter((fil: string) => fil !== id),
    };
    onFiltersChange({
      severity: type === 'Severity' ? filterTypes.severity : filters.severity,
      status: type === 'Status' ? filterTypes.status : filters.status,
    });
  };

  const onDeleteGroup = (type: string) => {
    const newFilters = {
      severity: type === 'Severity' ? [] : filters.severity,
      status: type === 'Status' ? [] : filters.status,
    };
    onFiltersChange(newFilters);
  };

  const onClearAllFilters = () => {
    onFiltersChange({
      severity: [],
      status: [],
    });
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
    severityTypes.urgent,
    severityTypes.high,
    severityTypes.normal,
    severityTypes.low,
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
          labels={filters.severity}
          deleteLabel={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteLabelGroup={(category) => onDeleteGroup(category as string)}
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
                value as string,
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
          labels={filters.status}
          deleteLabel={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteLabelGroup={(category) => onDeleteGroup(category as string)}
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
                value as string,
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
      clearAllFilters={onClearAllFilters}
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
