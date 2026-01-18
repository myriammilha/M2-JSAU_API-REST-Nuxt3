export async function useFetchFile(filename) {
  try {
    const response = await fetch(
      `http://localhost:8081/search?text=${filename}`,
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier:", error);
    return null;
  }
}
