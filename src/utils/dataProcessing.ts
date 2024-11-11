export function parseData(input: string): number[] {
  return input
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !isNaN(n));
}

export function generateTestData(): [number[], number[], number[]] {
  const x = Array.from({ length: 20 }, (_, i) => i + 1);
  
  const y = x.map((val) => {
    const base = Math.log(val) * 10;
    return base + (Math.random() - 0.5) * 2;
  });
  
  const z = x.map((val) => {
    const base = Math.log(val) * 8 + 5;
    return base + (Math.random() - 0.5) * 2;
  });
  
  return [x, y, z];
}

export function polynomialInterpolation(
  x: number[],
  y: number[],
  degree: number,
  points: number
): [number[], number[]] {
  const coefficients = polyfit(x, y, degree);
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const step = (xMax - xMin) / (points - 1);
  
  const xInterp = Array.from({ length: points }, (_, i) => xMin + i * step);
  const yInterp = xInterp.map((x) => evaluatePolynomial(x, coefficients));
  
  return [xInterp, yInterp];
}

export function polynomialInterpolation3D(
  x: number[],
  y: number[],
  z: number[],
  degree: number,
  points: number
): [number[], number[], number[]] {
  const coefficientsY = polyfit(x, y, degree);
  const coefficientsZ = polyfit(x, z, degree);
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const step = (xMax - xMin) / (points - 1);
  
  const xInterp = Array.from({ length: points }, (_, i) => xMin + i * step);
  const yInterp = xInterp.map((x) => evaluatePolynomial(x, coefficientsY));
  const zInterp = xInterp.map((x) => evaluatePolynomial(x, coefficientsZ));
  
  return [xInterp, yInterp, zInterp];
}

function polyfit(x: number[], y: number[], degree: number): number[] {
  const n = x.length;
  const matrix: number[][] = [];
  const vector: number[] = [];
  
  for (let i = 0; i <= degree; i++) {
    matrix[i] = [];
    for (let j = 0; j <= degree; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += Math.pow(x[k], i + j);
      }
      matrix[i][j] = sum;
    }
    
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += y[k] * Math.pow(x[k], i);
    }
    vector[i] = sum;
  }
  
  return solveSystem(matrix, vector);
}

function solveSystem(matrix: number[][], vector: number[]): number[] {
  const n = matrix.length;
  
  for (let i = 0; i < n; i++) {
    let maxEl = Math.abs(matrix[i][i]);
    let maxRow = i;
    
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > maxEl) {
        maxEl = Math.abs(matrix[k][i]);
        maxRow = k;
      }
    }
    
    for (let k = i; k < n; k++) {
      const tmp = matrix[maxRow][k];
      matrix[maxRow][k] = matrix[i][k];
      matrix[i][k] = tmp;
    }
    
    const tmp = vector[maxRow];
    vector[maxRow] = vector[i];
    vector[i] = tmp;
    
    for (let k = i + 1; k < n; k++) {
      const c = -matrix[k][i] / matrix[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          matrix[k][j] = 0;
        } else {
          matrix[k][j] += c * matrix[i][j];
        }
      }
      vector[k] += c * vector[i];
    }
  }
  
  const solution: number[] = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += matrix[i][j] * solution[j];
    }
    solution[i] = (vector[i] - sum) / matrix[i][i];
  }
  
  return solution;
}

function evaluatePolynomial(x: number, coefficients: number[]): number {
  return coefficients.reduce((sum, coef, i) => sum + coef * Math.pow(x, i), 0);
}