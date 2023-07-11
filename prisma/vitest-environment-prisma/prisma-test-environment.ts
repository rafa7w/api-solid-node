import { Environment } from "vitest";

export default <Environment>{
  name: 'prisma',
  // única função que o environment precisa, que é qual código queremos executar antes de cada arquivo de testes
  async setup() {
    console.log('Setup')
    
    return {
      // método que queremos executar depois dos testes executarem
      teardown() {
        console.log('Teardown')
      }
    }
  }, 
} 