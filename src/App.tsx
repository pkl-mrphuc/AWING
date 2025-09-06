import React from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const App: React.FC = () => {

  type SubmitItem = {
    Id: number;
    SubmitAt: string;
    Input: string;
    Output: string;
  };

  const [n, setN] = React.useState<number | null>(null);
  const [nError, setNError] = React.useState<boolean>(false);
  const [m, setM] = React.useState<number | null>(null);
  const [mError, setMError] = React.useState<boolean>(false);
  const [p, setP] = React.useState<number | null>(null);
  const [pError, setPError] = React.useState<boolean>(false);
  const [matrix, setMatrix] = React.useState<string | null>(null);
  const [matrixError, setMatrixError] = React.useState<boolean>(false);
  const [graph, setGraph] = React.useState<number[][] | null>(null);
  const [rows, setRows] = React.useState<SubmitItem[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem("submitHistory");
    if (saved) {
      setRows(JSON.parse(saved));
    }
  }, []);

  const toInt = (value: string | null) => {
    if (!value) {
      return null;
    }

    try {
      return parseInt(value);
    } catch (error) {
      return null;
    }
  };

  const submit = () => {
    setNError(!n || n <= 0);
    setMError(!m || m <= 0);
    setPError(!p || p <= 0);
    setMatrixError(!matrix);

    if (!n || n <= 0 || !m || m <= 0 || !p || p <= 0 || !matrix) {
      return;
    }

    try {
      setGraph(JSON.parse(matrix ?? ""));
    } catch (error) {
      setGraph(null);
      setMatrixError(true);
    }

    if (!graph) {
      return;
    }

    if (n !== graph.length || m !== graph[0].length) {
      setMatrixError(true);
    }

    let s: number[] = [];

    for (let i = 0; i <= p; i++) {
      s.push(0);
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        s[graph[i][j]]++;
      }
    }

    let valid = true;
    for (let i = 1; i <= p; i++) {
      if (s[i] === 0) {
        valid = false;
        break;
      }
    }

    if (!valid) {
      setMatrixError(true);
      return;
    }

    var result = handle(n, m, p, graph);

    const newRow: SubmitItem = {
      Id: rows.length + 1,
      SubmitAt: new Date().toLocaleString(),
      Input: `n=${n}, m=${m}, p=${p}, matrix=${matrix}`,
      Output: result !== undefined ? result.toString() : "No Result",
    };

    const updatedRows = [newRow, ...rows];
    setRows(updatedRows);
    localStorage.setItem("submitHistory", JSON.stringify(updatedRows));

    alert(`Result: ${result}`);

    setN(null);
    setM(null);
    setP(null);
    setMatrix(null);
    setGraph(null);
  };

  const handle = (n: number, m: number, p: number, matrix: number[][]) => {
    const positions = new Map();

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const val = matrix[i][j];
        if (!positions.has(val)) {
          positions.set(val, [{ r: i, c: j }]);
        } else {
          positions.get(val).push({ r: i, c: j });
        }
      }
    }

    let minCost = Number.POSITIVE_INFINITY;
    type Item = { r: number; c: number; key: number; cost: number };
    const container: Item[] = [];
    container.push({ r: 0, c: 0, key: 0, cost: 0 });

    while (container.length > 0) {
      const item = container.pop();

      if (!item) return;

      const row: number = item.r;
      const col: number = item.c;
      const key: number = item.key;
      const cost: number = item.cost;

      if (matrix[row][col] === p && cost > 0 && cost < minCost) {
        minCost = cost;
      }

      if (positions.has(key + 1)) {
        let min = Number.POSITIVE_INFINITY;
        const locations = positions.get(key + 1);

        if (locations.length > 0) {
          for (let k = 0; k < locations.length; k++) {
            const i = locations[k].r;
            const j = locations[k].c;
            const distance = cost + Math.sqrt((row - i) ** 2 + (col - j) ** 2);

            if (distance <= min) {
              min = distance;
              container.push({ r: i, c: j, key: key + 1, cost: distance });
            }
          }
        }
      }
    }

    return minCost;
  };

  const clsValidate = () => {
    setNError(false);
    setMError(false);
    setPError(false);
    setMatrixError(false);
  };

  return (
    <Container>
      <Typography gutterBottom align="center" variant="h4">
        FIND TREASURE
      </Typography>
      <Paper
        sx={{ display: "flex", flexDirection: "column", padding: 2, gap: 2 }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <TextField
            label="n"
            type="number"
            value={n ?? ""}
            onChange={(e) => {
              setN(toInt(e.target.value));
            }}
            fullWidth
            error={nError}
            helperText={nError ? "Invalid data." : ""}
            onFocus={clsValidate}
          />
          <TextField
            label="m"
            type="number"
            value={m ?? ""}
            onChange={(e) => {
              setM(toInt(e.target.value));
            }}
            fullWidth
            error={mError}
            helperText={mError ? "Invalid data." : ""}
            onFocus={clsValidate}
          />
          <TextField
            label="p"
            type="number"
            value={p ?? ""}
            onChange={(e) => {
              setP(toInt(e.target.value));
            }}
            fullWidth
            error={pError}
            helperText={pError ? "Invalid data." : ""}
            onFocus={clsValidate}
          />
          <TextField
            label="matrix"
            value={matrix ?? ""}
            onChange={(e) => {
              setMatrix(e.target.value);
            }}
            error={matrixError}
            helperText={matrixError ? "Invalid data." : ""}
            fullWidth
          />
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </Box>
      </Paper>

      <Typography gutterBottom align="center" variant="h5" sx={{ padding: 2 }}>
        Submit Histories
      </Typography>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Submit At</TableCell>
                <TableCell>Input</TableCell>
                <TableCell>Output</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.SubmitAt}</TableCell>
                  <TableCell>{row.Input}</TableCell>
                  <TableCell>{row.Output}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default App;
