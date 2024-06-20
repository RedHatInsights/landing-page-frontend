import React from 'react';
import { Toolbar } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarFilter } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarToggleGroup } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import { ToolbarGroup } from '@patternfly/react-core/dist/dynamic/components/Toolbar';
import {
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core/dist/dynamic/components/MenuToggle';
import { Select } from '@patternfly/react-core/dist/dynamic/components/Select';
import { SelectList } from '@patternfly/react-core/dist/dynamic/components/Select';
import { SelectOption } from '@patternfly/react-core/dist/dynamic/components/Select';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { severityTypes, statusTypes } from '../../utils/consts';

export const SupportCaseWidgetTableFilter: React.FunctionComponent = () => {
  const [isProductFamilyExpanded, setIsProductFamilyExpanded] =
    React.useState(false);
  const [isSeverityExpanded, setIsSeverityExpanded] = React.useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = React.useState(false);
  const [filters, setFilters] = React.useState({
    productFamily: [''],
    severity: [''],
    status: [''],
  });

  const onSelect = (
    type: string,
    event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    selection: string
  ) => {
    const checked = (event.target as HTMLInputElement).checked;
    setFilters((prev) => {
      const prevSelections = prev[type];
      return {
        ...prev,
        [type]: checked
          ? [...prevSelections, selection]
          : prevSelections.filter((value: string) => value !== selection),
      };
    });
  };

  const onProductFamilySelect = (
    event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    selection: string
  ) => {
    onSelect('productFamily', event, selection);
  };

  const onSeveritySelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string
  ) => {
    onSelect('severity', event, selection);
  };

  const onStatusSelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string
  ) => {
    onSelect('status', event, selection);
  };

  const onDelete = (type: string, id: string) => {
    if (type === 'Product Family') {
      setFilters({
        productFamily: filters.productFamily.filter(
          (fil: string) => fil !== id
        ),
        severity: filters.severity,
        status: filters.status,
      });
    } else if (type === 'Severity') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity.filter((fil: string) => fil !== id),
        status: filters.status,
      });
    } else if (type === 'Status') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity,
        status: filters.status.filter((fil: string) => fil !== id),
      });
    } else {
      setFilters({ productFamily: [], severity: [], status: [] });
    }
  };

  const onDeleteGroup = (type: string) => {
    if (type === 'Product Family') {
      setFilters({
        productFamily: [],
        severity: filters.severity,
        status: filters.status,
      });
    } else if (type === 'Severity') {
      setFilters({
        productFamily: filters.productFamily,
        severity: [],
        status: filters.status,
      });
    } else if (type === 'Status') {
      setFilters({
        productFamily: filters.productFamily,
        severity: filters.severity,
        status: [],
      });
    }
  };

  const onProductFamilyToggle = () => {
    setIsProductFamilyExpanded(!isProductFamilyExpanded);
  };

  const onSeverityToggle = () => {
    setIsSeverityExpanded(!isSeverityExpanded);
  };

  const onStatusToggle = () => {
    setIsStatusExpanded(!isStatusExpanded);
  };

  const statusMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key={statusTypes.closed}
        value={statusTypes.closed}
        isSelected={filters.status.includes(statusTypes.closed)}
      >
        {statusTypes.closed}
      </SelectOption>
      <SelectOption
        hasCheckbox
        key={statusTypes.customerWaiting}
        value={statusTypes.customerWaiting}
        isSelected={filters.status.includes(statusTypes.customerWaiting)}
      >
        {statusTypes.customerWaiting}
      </SelectOption>
      <SelectOption
        hasCheckbox
        key={statusTypes.redHatWaiting}
        value={statusTypes.redHatWaiting}
        isSelected={filters.status.includes(statusTypes.redHatWaiting)}
      >
        {statusTypes.redHatWaiting}
      </SelectOption>
    </SelectList>
  );

  const severityMenuItems = (
    <SelectList>
      <SelectOption
        hasCheckbox
        key={severityTypes.low}
        value={severityTypes.low}
        isSelected={filters.severity.includes(severityTypes.low)}
      >
        {severityTypes.low}
      </SelectOption>
      <SelectOption
        hasCheckbox
        key={severityTypes.normal}
        value={severityTypes.normal}
        isSelected={filters.severity.includes(severityTypes.normal)}
      >
        {severityTypes.normal}
      </SelectOption>
      <SelectOption
        hasCheckbox
        key={severityTypes.high}
        value={severityTypes.high}
        isSelected={filters.severity.includes(severityTypes.high)}
      >
        {severityTypes.high}
      </SelectOption>
      <SelectOption
        hasCheckbox
        key={severityTypes.urgent}
        value={severityTypes.urgent}
        isSelected={filters.severity.includes(severityTypes.urgent)}
      >
        {severityTypes.urgent}
      </SelectOption>
    </SelectList>
  );

  const toggleGroupItems = (
    <React.Fragment>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          chips={filters.productFamily}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
          deleteChipGroup={(category) => onDeleteGroup(category as string)}
          categoryName="Product Family"
        >
          <Select
            aria-label="Product Family"
            role="menu"
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onProductFamilyToggle}
                isExpanded={isProductFamilyExpanded}
                style={
                  {
                    width: '140px',
                  } as React.CSSProperties
                }
              >
                Product Family
              </MenuToggle>
            )}
            onSelect={onProductFamilySelect}
            selected={filters.productFamily}
            isOpen={isProductFamilyExpanded}
            onOpenChange={(isOpen) => setIsProductFamilyExpanded(isOpen)}
          ></Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.severity}
          deleteChip={(category, chip) =>
            onDelete(category as string, chip as string)
          }
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
            onSelect={onSeveritySelect}
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
            onSelect={onStatusSelect}
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
      clearAllFilters={() => onDelete('', '')}
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
