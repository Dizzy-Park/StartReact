import styled, { css } from "styled-components";

/**
 * table
 */
export const TableContainer = styled.div<{
  direction?: "col" | "row";
  over?: boolean;
  height?: number;
  selected?: boolean;
}>`
  border-bottom: 1px solid var(--border-primary);
  & table {
    table-layout: fixed;
    min-width: 100%;
    border-top: 1px solid var(--border-dark);
    background-color: var(--background-body);
    & thead {
      border-bottom: 1px solid var(--border-primary);
      & th {
        height: 57px;
      }
    }
    & tr {
      ${props => {
        if (props.selected === true) {
          return css`
            cursor: pointer;
            &:hover {
              background-color: #eeeeee;
            }
            &.active {
              background-color: #eeeeee;
            }
            &.none {
              cursor: auto;
              &:hover {
                background-color: transparent;
              }
            }
          `;
        }
        return css``;
      }}
      border-top: 1px solid var(--bg-grey);
      &:first-child {
        border-top: 0;
      }
    }
    & th,
    & td {
      height: 67px;
      padding: 10px;
      vertical-align: middle;
      white-space: nowrap;
      text-align: center;
      &.space-normal {
        white-space: normal;
      }
    }
    & th {
      background-color: var(--bg-table-head);
      font-weight: 500;
      font-size: 12px;
      word-break: keep-all;
      & em {
        margin-left: 2px;
        color: var(--negative);
      }
    }
    & td {
      color: var(--font-primary);
    }
  }
  ${props => (props.over ? "overflow: auto; border-bottom: 0;" : "")}
  ${props => (props.height ? `max-height: ${props.height}px;` : "")}
    ${props => {
    switch (props.direction) {
      case "row":
        return css`
          & th,
          & td {
            text-align: left;
          }
          & tbody table thead th {
            background-color: var(--bg-table-head);
          }
        `;
      case "col":
      default:
        return css`
          & th,
          & td {
            padding: 15px 10px;
            height: 57px;
            font-size: 13px;
          }
          & th {
            border-left: 1px solid var(--border-primary);
            text-align: center;
          }
          & tr > th:first-child,
          & tr > td:first-child {
            border-left: 0;
          }
          & thead th {
            padding: 15px 10px;
          }
          & tbody th {
            border-left: 1px solid var(--border-primary);
            font-size: 14px;
            background-color: #fff;
            font-weight: 400;
          }
          & tbody table thead th {
            background-color: var(--bg-table-head);
          }
          & td {
            border-left: 1px solid var(--border-primary);
            text-align: center;
          }
        `;
    }
  }}
`;
