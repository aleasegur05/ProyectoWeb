function devolver() {
  return JSON.parse('{"computerComponents":{"CPU":{"name":"Intel Core i9-11900K","cores":8,"threads":16,"baseClock":"3.5 GHz","boostClock":"5.3 GHz"},"RAM":{"type":"DDR4","capacity":"32 GB","speed":"3200 MHz"},"storage":[{"type":"SSD","capacity":"1 TB","interface":"NVMe"},{"type":"HDD","capacity":"2 TB","interface":"SATA"}],"motherboard":{"model":"ASUS ROG Strix Z590-E","formFactor":"ATX","chipset":"Intel Z590"},"GPU":{"model":"NVIDIA GeForce RTX 3080","memory":"10 GB GDDR6X","coreClock":"1440 MHz","boostClock":"1710 MHz"},"opticalDrive":{"type":"Blu-ray","readSpeed":"16x","writeSpeed":"12x"},"peripherals":[{"type":"keyboard","model":"Logitech G Pro","connection":"Wired"},{"type":"mouse","model":"Razer DeathAdder V2","connection":"Wired"},{"type":"monitor","model":"Dell UltraSharp U2720Q","size":"27 inches","resolution":"3840x2160"}]}}');
}

function numero_componentes() {
  let componentes = devolver();
  let tam = 0;
  Object.keys(componentes.computerComponents).forEach(key => {
      if(Array.isArray(componentes.computerComponents[key])){
        tam += componentes.computerComponents[key].length;
      }else{
        tam++;
      }
  });
  let cont = '<p>El número disponible de componentes es: ' + tam + '</p>';
  document.querySelector('#numero_comp').innerHTML = cont;
}

function mostrarComp() {
  let buscar = document.getElementById("compo").value.toLowerCase();
  let componentes = devolver().computerComponents;

  let cont = '';
  Object.keys(componentes).forEach(key => {
    let component = componentes[key];
    if (!Array.isArray(component)) {
      if (component.name && component.name.toLowerCase().includes(buscar)) {
        cont += `<p>${key}: ${component.name}, Cores: ${component.cores || 'N/A'}, Threads: ${component.threads || 'N/A'}, Base Clock: ${component.baseClock || 'N/A'}, Boost Clock: ${component.boostClock || 'N/A'}</p>`;
      } else if (component.model && component.model.toLowerCase().includes(buscar)) {
        cont += `<p>${key}: ${component.model}, Forma: ${component.formFactor || 'N/A'}, Chipset: ${component.chipset || 'N/A'}</p>`;
      } else if (component.memory && component.memory.toLowerCase().includes(buscar)) {
        cont += `<p>${key}: ${component.model}, Memoria: ${component.memory || 'N/A'}, Core Clock: ${component.coreClock || 'N/A'}, Boost Clock: ${component.boostClock || 'N/A'}</p>`;
      }
    } else if (Array.isArray(component)) {
      component.forEach(item => {
        if (item.type && item.type.toLowerCase().includes(buscar)) {
          cont += `<p>${key} - ${item.type}: Capacity: ${item.capacity || 'N/A'}, Interface: ${item.interface || 'N/A'}</p>`;
        }
      });
    }
  });

  document.querySelector('#buscar_componente').innerHTML = cont;
}

function mostrarComponentes() {
  let componentes = devolver().computerComponents;
  let cont = '';

  Object.keys(componentes).forEach(key => {
    let component = componentes[key];
    if (typeof component === 'object' && !Array.isArray(component)) {
      cont += `<p>${key}: ${JSON.stringify(component)}</p>`;
    } else if (Array.isArray(component)) {
      component.forEach(item => {
        cont += `<p>${key} - ${item.type}: ${JSON.stringify(item)}</p>`;
      });
    }
  });

  document.querySelector('#comp_total').innerHTML = cont;
}
