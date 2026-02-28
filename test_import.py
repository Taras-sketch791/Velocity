# test_import.py
import sys
import os

print("Текущая директория:", os.getcwd())
print("\nСодержимое текущей директории:")
for item in os.listdir('backend'):
    print(f"  {item}")

print("\nPython path:")
for path in sys.path:
    print(f"  {path}")

print("\nПопытка импорта settings...")
try:
    # Пробуем разные варианты
    import importlib

    # Вариант 1
    print("1. Пробуем import project.settings")
    try:
        import project.settings

        print("   ✓ Успешно!")
    except ImportError as e:
        print(f"   ✗ Ошибка: {e}")

    # Вариант 2
    print("\n2. Пробуем импорт через importlib")
    try:
        settings = importlib.import_module('project.settings')
        print("   ✓ Успешно!")
    except ImportError as e:
        print(f"   ✗ Ошибка: {e}")

except Exception as e:
    print(f"Общая ошибка: {e}")