import styles from './Table.module.css';

/* eslint-disable */

interface TableProps {
  data?: string[][];
}

export const Table = ({ data }: TableProps) => {
  if (!data?.length) return null;

  const [header, ...rows] = data;

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th
                key={index}
                className={`${styles.th} ${index === 0 ? styles.stickyCol : ''}`}
                scope='col'
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rIndex) => (
            <tr key={rIndex} className={styles.tr}>
              {row.map((cell, cIndex) => (
                <td
                  key={cIndex}
                  className={`${styles.td} ${cIndex === 0 ? styles.stickyCol : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
