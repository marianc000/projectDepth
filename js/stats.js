import {isScript,isPackageJson}from './files.js';

export function projectStats(project) {
    const scripts = project.filter(f => isScript(f.path));
    const cnt = scripts.length;
    //const sizes = scripts.map(s => s.size);
    let max = 0, min = 0,avg;
    if (cnt) {
        const depths = scripts.map(s => s.path.split('/').length - 1);
        max = Math.max(...depths);
        min = Math.min(...depths);
        avg=Math.round(depths.reduce((t,v)=>t+v,0)/cnt);
    }
    return {
        cnt, max, min,avg
    };
}