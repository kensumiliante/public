class ChatBot {
  constructor() {
    this.context = [];
    this.responses = {
      greeting: [
        `Hola, soy PsicoBot, tu asistente virtual especializado en apoyo psicológico. 
        Estoy aquí para escucharte y ayudarte a explorar tus pensamientos y emociones. 
        ¿Cómo te sientes hoy?`,
        
        `Te doy la bienvenida a este espacio seguro. Como tu asistente virtual, 
        estoy aquí para brindarte apoyo y acompañamiento. ¿Qué te gustaría compartir conmigo?`,
        
        `Gracias por estar aquí. Soy PsicoBot, y aunque soy un asistente virtual, 
        estoy programado para escucharte sin juicios y ayudarte a explorar tus emociones. 
        ¿Qué te trae por aquí hoy?`
      ],
      
      anxiety: [
        `Entiendo que estés experimentando ansiedad. Es una respuesta natural del cuerpo 
        ante situaciones que percibimos como amenazantes o estresantes. ¿Podrías contarme 
        más sobre las situaciones específicas que te generan esta ansiedad? Esto me ayudará 
        a entender mejor tu experiencia y proporcionar estrategias más adecuadas.`,
        
        `La ansiedad puede ser muy abrumadora, y es importante que sepas que no estás 
        solo/a en esto. Muchas personas pasan por experiencias similares. ¿Te gustaría 
        que exploremos algunas técnicas de respiración y mindfulness que pueden ayudarte 
        a manejar estos momentos difíciles?`,
        
        `Cuando mencionas ansiedad, me pregunto: ¿has notado algún patrón en cuándo 
        o dónde sueles sentirte más ansioso/a? Identificar estos patrones puede ser 
        el primer paso para desarrollar estrategias de afrontamiento efectivas.`
      ],
      
      depression: [
        `Me entristece saber que estás pasando por un momento difícil. La depresión 
        puede hacernos sentir muy solos, pero quiero que sepas que estoy aquí para 
        escucharte. ¿Podrías contarme más sobre cómo han sido estos días para ti? 
        ¿Hay algo específico que haya desencadenado estos sentimientos?`,
        
        `Es muy valiente de tu parte hablar sobre estos sentimientos. La depresión 
        puede afectar muchos aspectos de nuestra vida diaria. ¿Has notado cambios 
        en tu rutina, como en tus patrones de sueño o alimentación? Compartir estos 
        detalles puede ayudarnos a entender mejor tu situación.`,
        
        `Cuando nos sentimos deprimidos, a veces puede parecer que no hay salida, 
        pero es importante recordar que estos sentimientos, aunque son muy reales, 
        no son permanentes. ¿Te gustaría explorar juntos algunas actividades o 
        estrategias que podrían ayudarte a sentirte un poco mejor?`
      ],
      
      stress: [
        `El estrés prolongado puede ser muy desgastante tanto física como 
        emocionalmente. ¿Podrías contarme más sobre las situaciones que te están 
        generando estrés? A veces, solo el hecho de identificar nuestros estresores 
        puede ayudarnos a empezar a manejarlos mejor.`,
        
        `Cuando estamos bajo mucho estrés, nuestro cuerpo y mente nos envían señales. 
        ¿Has notado síntomas físicos como tensión muscular, dolores de cabeza o 
        problemas para dormir? ¿O quizás cambios en tu estado de ánimo? Entender 
        estas señales nos puede ayudar a desarrollar estrategias más efectivas.`,
        
        `El estrés es una respuesta natural, pero cuando se vuelve excesivo, puede 
        afectar significativamente nuestra calidad de vida. ¿Te gustaría que 
        exploremos juntos algunas técnicas de manejo del estrés que podrían 
        ayudarte en tu día a día?`
      ],
      
      default: [
        `Lo que me cuentas es muy interesante. ¿Podrías profundizar un poco más? 
        Me ayudaría a entender mejor tu situación y así poder brindarte un mejor apoyo.`,
        
        `Gracias por compartir eso conmigo. ¿Cómo te hace sentir esta situación? 
        A veces, explorar nuestras emociones nos puede ayudar a entender mejor 
        lo que estamos viviendo.`,
        
        `Estoy aquí para escucharte y apoyarte. ¿Hay algo más específico sobre 
        esta situación que te gustaría explorar? No hay prisa, podemos ir a tu ritmo.`
      ]
    };
    
    this.responsePatterns = [
      {
        pattern: /(no puedo|difícil|imposible)/i,
        response: `Entiendo que te sientas así. A veces las situaciones pueden parecer 
        abrumadoras, pero es importante recordar que siempre hay diferentes perspectivas 
        y posibilidades. ¿Qué te hace sentir que es tan difícil?`
      },
      {
        pattern: /(miedo|asusta|temor)/i,
        response: `El miedo es una emoción muy válida que todos experimentamos. 
        ¿Podrías contarme más sobre qué específicamente te genera ese temor? 
        Entender nuestros miedos es el primer paso para manejarlos.`
      },
      {
        pattern: /(familia|padres|hermanos)/i,
        response: `Las relaciones familiares pueden ser complejas y generar muchas 
        emociones diferentes. ¿Cómo te afecta esta situación familiar? ¿Has podido 
        hablar con ellos sobre cómo te sientes?`
      }
    ];
  }

  analyzeMessage(message) {
    message = message.toLowerCase();
    this.context.push(message);
    
    // Mantener solo los últimos 5 mensajes para contexto
    if (this.context.length > 5) {
      this.context.shift();
    }
    
    // Primero verificar patrones específicos
    for (let pattern of this.responsePatterns) {
      if (message.match(pattern.pattern)) {
        return pattern.response;
      }
    }
    
    // Luego verificar categorías principales
    if (message.match(/^(hola|buenos días|buenas|hi|hello)/)) {
      return this.getRandomResponse('greeting');
    }
    if (message.match(/(ansie|ansiedad|nervios|nerviosa|nervioso)/)) {
      return this.getRandomResponse('anxiety');
    }
    if (message.match(/(triste|depresión|deprimido|deprimida|solo|sola)/)) {
      return this.getRandomResponse('depression');
    }
    if (message.match(/(estrés|estres|estresado|estresada|agobiado|agobiada)/)) {
      return this.getRandomResponse('stress');
    }
    
    // Analizar el contexto para respuestas más relevantes
    let contextualResponse = this.analyzeContext();
    if (contextualResponse) {
      return contextualResponse;
    }
    
    return this.getRandomResponse('default');
  }

  analyzeContext() {
    // Si hay menciones repetidas de ciertos temas en el contexto, 
    // proporcionar respuestas más específicas
    let anxietyCount = this.context.filter(msg => 
      msg.match(/(ansie|ansiedad|nervios)/)
    ).length;
    
    let depressionCount = this.context.filter(msg => 
      msg.match(/(triste|depresión|solo)/)
    ).length;
    
    if (anxietyCount >= 2) {
      return `He notado que has mencionado la ansiedad varias veces. 
      ¿Te gustaría que nos enfoquemos específicamente en estrategias 
      para manejar la ansiedad? Podemos explorar técnicas de respiración, 
      mindfulness o incluso ejercicios de relajación.`;
    }
    
    if (depressionCount >= 2) {
      return `Percibo que los sentimientos de tristeza son recurrentes 
      en lo que me cuentas. ¿Te gustaría que hablemos sobre actividades 
      o estrategias que podrían ayudarte a mejorar tu estado de ánimo? 
      A veces, pequeños cambios pueden hacer una gran diferencia.`;
    }
    
    return null;
  }

  getRandomResponse(type) {
    const responses = this.responses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Inicialización del chat
document.addEventListener('DOMContentLoaded', () => {
  const chatBot = new ChatBot();
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userMessage');
  const sendButton = document.getElementById('sendMessage');

  // Mensaje inicial
  addMessage('bot', chatBot.getRandomResponse('greeting'));

  function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage('user', message);
      userInput.value = '';

      // Simular tiempo de "escritura" del bot
      const typingTime = Math.min(1000 + message.length * 20, 3000);
      
      // Mostrar indicador de escritura
      const typingDiv = document.createElement('div');
      typingDiv.className = 'message bot typing';
      typingDiv.innerHTML = '<div class="message-content">Escribiendo...</div>';
      chatMessages.appendChild(typingDiv);
      
      setTimeout(() => {
        chatMessages.removeChild(typingDiv);
        const response = chatBot.analyzeMessage(message);
        addMessage('bot', response);
      }, typingTime);
    }
  }

  sendButton.addEventListener('click', handleUserMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserMessage();
    }
  });
});