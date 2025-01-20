import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const text = "CineInfo";

    // Configuração para animar cada letra com o efeito de "salto"
    const letterAnimation = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        transition: (index: number) => ({
            delay: index * 0.1, // Atraso incremental por letra
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15,
        }),
    };

    // Alterar a cor da letra após o "I"
    const getLetterColor = (index: number) => {
        if (text[index] === "I") {
            return "rgb(36, 122, 2)"; // Cor verde para a letra "I"
        }
        return "white"; // Cor branca para as outras letras
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                bgcolor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999,
            }}
        >
            {/* Fundo com gradiente animado */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        radial-gradient(circle at 30% 20%, rgba(70, 130, 180, 0.6), transparent 50%),
                        radial-gradient(circle at 70% 50%, rgba(75, 0, 130, 0.5), transparent 60%),
                        radial-gradient(circle at 50% 80%, rgba(123, 104, 238, 0.4), transparent 70%)
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                }}
            />

            {/* Animação do texto */}
            <Box
                sx={{
                    zIndex: 1,
                    display: 'flex',
                    fontSize: { xs: '3rem', sm: '6rem' },
                    fontWeight: 'bold',
                }}
            >
                {text.split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        initial="initial"
                        animate="animate"
                        variants={letterAnimation}
                        transition={letterAnimation.transition(index)}
                        style={{
                            display: 'inline-block',
                            color: getLetterColor(index), // Definir a cor com base no índice
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </Box>
        </Box>
    );
};

export default LoadingScreen;
