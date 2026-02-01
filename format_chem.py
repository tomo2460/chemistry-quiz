import re

# Define replacements (Order matters: Longer matches first to avoid partial replacements)
replacements = [
    # --- Ions with Charges (Superscripts & Subscripts) ---
    # Complex
    (r"NH4\+", "NH<sub>4</sub><sup>+</sup>"),
    (r"H3O\+", "H<sub>3</sub>O<sup>+</sup>"),
    (r"SO4 2-", "SO<sub>4</sub><sup>2-</sup>"),
    (r"CO3 2-", "CO<sub>3</sub><sup>2-</sup>"),
    (r"PO4 3-", "PO<sub>4</sub><sup>3-</sup>"),
    (r"NO3-", "NO<sub>3</sub><sup>-</sup>"),
    (r"OH-", "OH<sup>-</sup>"),
    (r"CH3COO-", "CH<sub>3</sub>COO<sup>-</sup>"),
    (r"ClO3-", "ClO<sub>3</sub><sup>-</sup>"),
    (r"ClO-", "ClO<sup>-</sup>"),
    (r"HSO4-", "HSO<sub>4</sub><sup>-</sup>"),
    (r"HPO4 2-", "HPO<sub>4</sub><sup>2-</sup>"),
    (r"HCO3-", "HCO<sub>3</sub><sup>-</sup>"),

    # Simple Ions (Superscript Charge)
    (r"Cu2\+", "Cu<sup>2+</sup>"),
    (r"Fe2\+", "Fe<sup>2+</sup>"),
    (r"Fe3\+", "Fe<sup>3+</sup>"),
    (r"Al3\+", "Al<sup>3+</sup>"),
    (r"Mg2\+", "Mg<sup>2+</sup>"),
    (r"Ca2\+", "Ca<sup>2+</sup>"),
    (r"Zn2\+", "Zn<sup>2+</sup>"),
    (r"Ba2\+", "Ba<sup>2+</sup>"),
    (r"Pb2\+", "Pb<sup>2+</sup>"),
    (r"Na\+", "Na<sup>+</sup>"),
    (r"K\+", "K<sup>+</sup>"),
    (r"Ag\+", "Ag<sup>+</sup>"),
    (r"Li\+", "Li<sup>+</sup>"),
    (r"H\+", "H<sup>+</sup>"),
    (r"O2-", "O<sup>2-</sup>"),
    (r"S2-", "S<sup>2-</sup>"),
    (r"Cl-", "Cl<sup>-</sup>"),
    (r"F-", "F<sup>-</sup>"),
    (r"Br-", "Br<sup>-</sup>"),
    (r"I-", "I<sup>-</sup>"),

    # --- Parentheses Groups (Subscripts) ---
    (r"\(OH\)2", "(OH)<sub>2</sub>"),
    (r"\(OH\)3", "(OH)<sub>3</sub>"),
    (r"\(NO3\)2", "(NO<sub>3</sub>)<sub>2</sub>"),
    (r"\(SO4\)3", "(SO<sub>4</sub>)<sub>3</sub>"),
    (r"\(NH4\)2", "(NH<sub>4</sub>)<sub>2</sub>"),
    (r"\(COO\)2", "(COO)<sub>2</sub>"),

    # --- Polyatomic Groups in Compounds (Neutral) ---
    # These catch things like "NH4Cl" where "NH4" needs sub but no charge
    (r"NH4(?!<)", "NH<sub>4</sub>"), # Negative lookahead to avoid double sub if already replaced? No, script runs sequential replace text. 
    # Actually, if I replace "NH4+" first, it becomes "NH<sub>4</sub><sup>+</sup>".
    # Then checking "NH4" might match inside the tag if I'm not careful? 
    # "NH<sub>4</sub>" contains "NH4"? No, it contains "NH</sub>".
    # Wait, simple replace finds "NH4" string.
    # If I already replaced "NH4+" -> "NH<sub>4</sub>...", the string "NH4" is gone.
    # So I can safely add "NH4" rule AFTER "NH4+" rule to catch remaining neutral ones.
    (r"NH4", "NH<sub>4</sub>"),
    (r"SO4", "SO<sub>4</sub>"),
    (r"PO4", "PO<sub>4</sub>"),
    (r"NO3", "NO<sub>3</sub>"),
    (r"CO3", "CO<sub>3</sub>"),
    (r"ClO3", "ClO<sub>3</sub>"),
    
    # --- Whole Molecules (Specific) ---
    (r"H2SO4", "H<sub>2</sub>SO<sub>4</sub>"),
    (r"HNO3", "HNO<sub>3</sub>"),
    (r"H2CO3", "H<sub>2</sub>CO<sub>3</sub>"),
    (r"H3PO4", "H<sub>3</sub>PO<sub>4</sub>"),
    (r"CH3COOH", "CH<sub>3</sub>COOH"),
    (r"CaCl2", "CaCl<sub>2</sub>"),
    (r"MgCl2", "MgCl<sub>2</sub>"),
    (r"FeCl3", "FeCl<sub>3</sub>"),
    (r"Al2O3", "Al<sub>2</sub>O<sub>3</sub>"),
    (r"Fe2O3", "Fe<sub>2</sub>O<sub>3</sub>"),
    (r"Fe3O4", "Fe<sub>3</sub>O<sub>4</sub>"),
    (r"Na2CO3", "Na<sub>2</sub>CO<sub>3</sub>"),
    (r"NaHCO3", "NaHCO<sub>3</sub>"),
    (r"Ca\(OH\)2", "Ca(OH)<sub>2</sub>"), # Explicit
    (r"H2O2", "H<sub>2</sub>O<sub>2</sub>"),
    (r"SiO2", "SiO<sub>2</sub>"),
    (r"CO2", "CO<sub>2</sub>"),
    (r"SO2", "SO<sub>2</sub>"),
    (r"NO2", "NO<sub>2</sub>"),
    (r"H2O", "H<sub>2</sub>O"),
    (r"NH3", "NH<sub>3</sub>"),
    (r"CH4", "CH<sub>4</sub>"),
    (r"C2H6", "C<sub>2</sub>H<sub>6</sub>"),
    (r"C2H4", "C<sub>2</sub>H<sub>4</sub>"),
    (r"C2H2", "C<sub>2</sub>H<sub>2</sub>"),
    (r"C6H6", "C<sub>6</sub>H<sub>6</sub>"),
    (r"C60", "C<sub>60</sub>"),
    
    # --- Diatomic Molecules ---
    (r"(?<!sub>)O2", "O<sub>2</sub>"), # Avoid matching inside existing tags if rerun?
    # Simple strings:
    (r"O2", "O<sub>2</sub>"),
    (r"N2", "N<sub>2</sub>"),
    (r"H2", "H<sub>2</sub>"),
    (r"Cl2", "Cl<sub>2</sub>"),
    (r"Br2", "Br<sub>2</sub>"),
    (r"I2", "I<sub>2</sub>"),
    (r"F2", "F<sub>2</sub>"),
    
    # --- Catch-all specific fixes for options ---
    (r"Cu2O", "Cu<sub>2</sub>O"),
    (r"Ag2O", "Ag<sub>2</sub>O"),
    (r"Na2O", "Na<sub>2</sub>O"),
    (r"K2O", "K<sub>2</sub>O"),
    (r"Li2O", "Li<sub>2</sub>O"),
    (r"H2S", "H<sub>2</sub>S"),
    (r"SO3", "SO<sub>3</sub>"),
    (r"NO", "NO"), # No number
    (r"CO", "CO"), # No number
    
    # --- Final Polish: Space & Inverse Fixes (Catch-all) ---
    
    # Ions with spaces (e.g., "Al 3+" -> "Al^3+")
    # Matches: Element(1-2 chars) + Space(s) + Number + Charge(+/-)
    (r"([A-Z][a-z]?)\s+(\d+)([+\-])", r"\1<sup>\2\3</sup>"), 
    (r"([A-Z][a-z]?)\s+([+\-])", r"\1<sup>\2</sup>"), # "Na +" -> "Na^+" cases

    # Polyatomic ions with spaces (e.g. "SO4 2-", "PO3 3-")
    # This is tricky because "SO4" might already be "SO<sub>4</sub>" or just "SO4".
    # Case 1: "SO4 2-" -> "SO<sub>4</sub><sup>2-</sup>"
    # Case 2: "SO<sub>4</sub> 2-" -> "SO<sub>4</sub><sup>2-</sup>"
    (r"(O|H|N|Cl|S|P)(<sub>)?(\d)(</sub>)?\s+(\d+)([+\-])", r"\1<sub>\3</sub><sup>\5\6</sup>"),

    # Simple anions with spaces (e.g. "S 2-", "O 2-")
    (r"\b(S|O|N|P)\s+(\d+)([+\-])", r"\1<sup>\2\3</sup>"),
    
    # Remove rogue spaces before numbers in formulas (e.g., "Cu 2 O")
    # Matches: [Element] + Space + [Digit] + Space + [Element]
    # Be careful not to match sentence text.
    # Look for "Cu 2 O" specific pattern or generic Element-Space-Digit-Element
    (r"([A-Z][a-z]?)\s+(\d)\s*([A-Z])", r"\1<sub>\2</sub>\3"),
    
    # Catch any remaining "Space + Charge" (e.g. "Br -")
    (r"\b([A-Z][a-z]?)\s+([+\-])", r"\1<sup>\2</sup>"),
    
    # Fix "inverse" formatting if any (e.g. "O<sup>2</sup>" where it should be "O<sub>2</sub>")
    # Hard to detect automatically without context, but we can enforce chemical rules.
    # O2 is always O_2 unless O^2- (which has sign).
    # So: If Letter + <sup>Digit</sup> + (No Sign), convert to sub.
    (r"([A-Za-z])<sup>(\d+)</sup>(?![\+\-])", r"\1<sub>\2</sub>"),
    
    # Clean up double tags if they generated
    (r"<sub><sub>", "<sub>"),
    (r"</sub></sub>", "</sub>"),
    (r"<sup><sup>", "<sup>"),
    (r"</sup></sup>", "</sup>"),
]

filepath = "/Users/nishimuratomo/Antigravity/CHEMISTRY/js/data.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

original_content = content

# To make this idempotent (safe to re-run), we should avoid replacing things that are already replaced.
# Best way is to check if it's already surrounded by tags?
# Or just assume the input is clean-ish or we are fixing missed ones.
# The previous script already ran. So "H2O" is already "H<sub>2</sub>O".
# If we run (r"H2O", "H<sub>2</sub>O") again on "H<sub>2</sub>O", it won't match "H2O".
# But (r"H2", "H<sub>2</sub>") might match the "H2" inside... wait.
# "H<sub>2</sub>O" text.
# `H2` pattern.
# Does `H2` match `H<sub>2</sub>`? No.
# Does `O2` match `O<sub>2</sub>`? No.
# But `CO2` rule?
# `CO<sub>2</sub>` does not match `CO2`.
# However, if I add `NH4` rule now, and I have `NH4Cl` (previously untouched), it will work.
# If I have `NH<sub>4</sub><sup>+</sup>` (previously changed), `NH4` pattern won't match.
# So it seems safe to just run this new list.

for pattern, replacement in replacements:
    # Compile regex to ensure we don't match inside tags if possible, 
    # but simplest is just rely on the text not matching the pattern anymore.
    # e.g. "NH4" pattern won't match "NH<sub>4</sub>" because of the <sub>.
    
    content = re.sub(pattern, replacement, content)

if content != original_content:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Modified js/data.js")
else:
    print("No changes made.")
